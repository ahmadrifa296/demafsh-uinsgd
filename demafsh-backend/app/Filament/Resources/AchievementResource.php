<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AchievementResource\Pages;
use App\Models\Achievement;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class AchievementResource extends Resource
{
    protected static ?string $model = Achievement::class;

    protected static ?string $navigationIcon = 'heroicon-o-trophy';

    protected static ?string $navigationGroup = 'Layanan Mahasiswa';

    protected static ?string $navigationLabel = 'Prestasi Mahasiswa';

    protected static ?string $modelLabel = 'Prestasi';

    protected static ?string $pluralModelLabel = 'Prestasi Mahasiswa';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Data Mahasiswa & Prestasi')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('student_name')
                            ->label('Nama Mahasiswa')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('nim')
                            ->label('NIM')
                            ->maxLength(50),
                        Forms\Components\TextInput::make('major')
                            ->label('Program Studi / Jurusan')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('event_name')
                            ->label('Nama Kompetisi / Ajang')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('rank')
                            ->label('Peringkat / Capaian')
                            ->required()
                            ->placeholder('Juara 1, Harapan 1, Best Speaker, dll.')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('level')
                            ->label('Tingkat')
                            ->required()
                            ->datalist(['Fakultas', 'Universitas', 'Regional', 'Nasional', 'Internasional'])
                            ->maxLength(100),
                    ]),

                Forms\Components\Section::make('Dokumentasi & Verifikasi')
                    ->columns(2)
                    ->schema([
                        Forms\Components\FileUpload::make('photo')
                            ->label('Foto Mahasiswa / Dokumentasi')
                            ->image()
                            ->imageEditor()
                            ->disk('public')
                            ->directory('achievements/photos')
                            ->visibility('public'),
                        Forms\Components\FileUpload::make('certificate_file')
                            ->label('Bukti Sertifikat / Piagam')
                            ->acceptedFileTypes(['application/pdf', 'image/jpeg', 'image/png', 'image/webp'])
                            ->disk('public')
                            ->directory('achievements/certificates')
                            ->visibility('public')
                            ->downloadable()
                            ->openable(),
                        Forms\Components\Toggle::make('is_published')
                            ->label('Verifikasi & Tampilkan di Website')
                            ->default(false)
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')
            ->columns([
                Tables\Columns\ImageColumn::make('photo')
                    ->label('Foto')
                    ->disk('public')
                    ->circular(),
                Tables\Columns\TextColumn::make('student_name')
                    ->label('Mahasiswa')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('major')
                    ->label('Jurusan')
                    ->searchable()
                    ->limit(25),
                Tables\Columns\TextColumn::make('event_name')
                    ->label('Kompetisi / Ajang')
                    ->searchable()
                    ->limit(40)
                    ->wrap(),
                Tables\Columns\TextColumn::make('rank')
                    ->label('Capaian')
                    ->searchable(),
                Tables\Columns\TextColumn::make('level')
                    ->label('Tingkat')
                    ->badge()
                    ->color('amber')
                    ->searchable(),
                Tables\Columns\ToggleColumn::make('is_published')
                    ->label('Verifikasi Tampil'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Diajukan')
                    ->dateTime('d M Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Status Verifikasi')
                    ->trueLabel('Terverifikasi (Tampil)')
                    ->falseLabel('Belum Diverifikasi'),
                Tables\Filters\SelectFilter::make('level')
                    ->label('Tingkat')
                    ->options([
                        'Fakultas' => 'Fakultas',
                        'Universitas' => 'Universitas',
                        'Regional' => 'Regional',
                        'Nasional' => 'Nasional',
                        'Internasional' => 'Internasional',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAchievements::route('/'),
            'create' => Pages\CreateAchievement::route('/create'),
            'edit' => Pages\EditAchievement::route('/{record}/edit'),
        ];
    }
}
